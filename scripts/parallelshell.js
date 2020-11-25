// https://www.npmjs.com/package/parallelshell + bugfix
/* eslint-disable no-console */
const spawn = require('child_process').spawn;

// eslint-disable-next-line
let sh, shFlag, wait, verbose, i, len;
// parsing argv
const cmds = [];
const children = [];
const args = process.argv.slice(2);
for (i = 0, len = args.length; i < len; i++) {
  if (args[i][0] === '-') {
    switch (args[i]) {
      case '-w':
      case '--wait':
        wait = true;
        break;
      case '-v':
      case '--verbose':
        verbose = true;
        break;
      case '-h':
      case '--help':
        console.log('-h, --help         output usage information');
        console.log('-v, --verbose      verbose logging');
        console.log('-w, --wait         will not close sibling processes on error');
        process.exit();
    }
  } else {
    cmds.push(args[i]);
  }
}

// called on close of a child process
function childClose(code) {
  code = code ? code.code || code : code;
  if (verbose) {
    if (code > 0) {
      console.error('`' + this.cmd + '` failed with exit code ' + code);
    } else {
      console.log('`' + this.cmd + '` ended successfully');
    }
  }
  if (code > 0 && !wait) {
    close(code);
  }
  status();
}

function status() {
  if (verbose) {
    let i;
    let len;
    console.log('\n');
    console.log('### Status ###');
    for (i = 0, len = children.length; i < len; i++) {
      if (children[i].exitCode === null) {
        console.log('`' + children[i].cmd + '` is still running');
      } else if (children[i].exitCode > 0) {
        console.log('`' + children[i].cmd + '` errored');
      } else {
        console.log('`' + children[i].cmd + '` finished');
      }
    }
    console.log('\n');
  }
}

// closes all children and the process
function close(code) {
  let i;
  let len;
  let closed = 0;
  let opened = 0;

  for (i = 0, len = children.length; i < len; i++) {
    if (!children[i].exitCode) {
      opened++;
      children[i].removeAllListeners('close');
      children[i].kill('SIGINT');
      if (verbose) {
        console.log('`' + children[i].cmd + '` will now be closed');
      }
      children[i].on('close', function() {
        closed++;
        if (opened === closed) {
          process.exit(code);
        }
      });
    }
  }
  if (opened === closed) {
    process.exit(code);
  }
}

// cross platform compatibility
if (process.platform === 'win32') {
  sh = 'cmd';
  shFlag = '/c';
} else {
  sh = 'sh';
  shFlag = '-c';
}

// start the children
cmds.forEach(function(cmd) {
  if (process.platform !== 'win32') {
    cmd = 'exec ' + cmd;
  }
  const child = spawn(sh, [shFlag, cmd], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ['pipe', process.stdout, process.stderr]
  }).on('close', childClose);
  child.cmd = cmd;
  children.push(child);
});

// close all children on ctrl+c
process.on('SIGINT', close);