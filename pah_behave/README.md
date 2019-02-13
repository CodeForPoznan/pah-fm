# Download Chromedriver

1. go to the `http://chromedriver.chromium.org`
1. download the latest version of Chromedriver
1. move it to `/usr/local/bin`

You can repeat these steps for Geckodriver or other.

# Creating virtual environment

Create separate folder for your virtual environment, eg. in home directory:

1. ```mkdir selenium```
1. ```cd selenium```

1. ```python3 -m venv pah_behave```

1. ```source pah_behave/bin/activate```

1. ```pip install -r requirements.txt```

# Working with virtual environment

From home directory:

1. ```cd selenium```
1. ```source pah_behave/bin/activate```

Go to the directory with PAH website, eg.:

1. ```cd codeforpoznan/pah_fm/pah_behave```

# Running behave tests

Make sure, that virtual environment is active, so the prompt will look like:

1. ```(pah_behave) ~/codeforpoznan/pah-fm/pah_ccbehave```

1. ```behave pah_ccbehave/features/```

