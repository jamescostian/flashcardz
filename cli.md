# Installation

```bash
npm install -g flashcardz
```

You *might* need to use `sudo` for that command

# Architecture

All of the code for the CLI is in the `bin` directory. Flashcardz installs 1 "binary" file - `bin/flash`, which is called `flash` on your system. That "binary" file allows you to use git-like subcommands. So running `flash convert` is the same as `bin/flash-convert`. Each of the "binary" files for the subcommands has "usage" and "description" thingies available if you just use `flash [subcommand] --help` or `flash help [subcommand]`

Each of the binaries needs to get a stack of flashcards as input. They all accept JSON from STDIN or files, except for `combine` and `quiz` which require files. So the following are equivalent:

```bash
flash convert myfile tab/newline
cat myfile | flash convert tab/newline
```

# Conversion

If you're studying stuff on [Quizlet](http://quizlet.com), you can just export your set of cards with the default settings and save the file. If you've saved the file, you can do something like this:

```bash
flash convert file-from-quizlet tab/newline > newfile
# or
cat file-from-quizlet | flash convert tab/newline > newfile
```

Then you can be quizzed over `newfile` via `flash quiz newfile`

# Quiz

```bash
flash quiz newfile
```

Note: `quiz` does not accept things from STDIN - you must provide a file name so that the file can be saved after your quiz

# Hardest and Easiest

Want to know which cards you struggle with the most and which ones you really know? Here's how you can find the #1 hardest and #1 easiest cards:

```bash
flash hardest newfile
flash easiest newfile
```

If you want to see, say, the top `$X` cards, you could use `-n $X`. For example, if you want to find the top 5 hardest cards and top 3 easiest cards, you could use this:

```bash
flash hardest -n 5 newfile
flash easiest -n 3 newfile
```

# Combinations

Combine as many files as you want:

```bash
flash combine afile1 anotherfile2 yetanother3 > combined-stack
```

And then feel free to do stuff with that new stack:

```
flash quiz combined-stack
```

Note: `combine` does not accept things from STDIN - you must provide files

# Remove Duplicates

If you have a couple stacks and you combine them but realize that there are some duplicates on in the combined file, use `dedupe`:

```bash
flash dedupe combined-stack > perf
```

Then feel free to do stuff like

```bash
flash quiz perf
```

The way the dedupe algorithm decides whether or not something is a duplicate, is it checks out whether the fronts and backs of 2 cards are the same.

# Full example

Assuming I have a bunch of files which are exports from Quizlet, and they're all in a directory - with nothing else in that directory - here's something I could do:

```bash
# Loop through all of the files
for file in *
do
	# Convert the file to its old name plus ".json"
	flash convert $file tab/newline > "$(echo $file).json"
	# Remove the old file
	rm $file
done
# Combine all of the files left
flash combine *.json > new
# Remove duplicate cards
flash dedupe new > perfect-stack
# Get quizzed over that new combined + deduped stack
flash quiz perfect-stack
```
