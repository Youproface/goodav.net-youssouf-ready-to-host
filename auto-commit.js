import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoPath = path.resolve(__dirname);

const watcher = chokidar.watch(repoPath, {
  ignored: [
    /(^|[\/\\])\../, // ignore dotfiles
    /node_modules/,    // ignore node_modules
    /\.git/,          // ignore .git
    /bun.lockb/,       // ignore bun.lockb
    /dist/,            // ignore dist
    /public/,          // optionally ignore public assets
  ],
  persistent: true,
  ignoreInitial: true,
});

function autoCommit(filePath) {
  exec('git add .', { cwd: repoPath }, (err) => {
    if (err) return console.error('Git add error:', err);
    exec('git commit -m "Auto-commit: file change detected"', { cwd: repoPath }, (err, stdout, stderr) => {
      if (err) {
        if (stderr && stderr.includes('nothing to commit')) return; // No changes
        return console.error('Git commit error:', err);
      }
      console.log('Committed change:', filePath);
      // Push after successful commit
      exec('git push', { cwd: repoPath }, (err, stdout, stderr) => {
        if (err) {
          return console.error('Git push error:', err);
        }
        console.log('Pushed to remote.');
      });
    });
  });
}

watcher.on('change', autoCommit);
watcher.on('add', autoCommit);
watcher.on('unlink', autoCommit);

console.log('Auto-commit watcher running...');
