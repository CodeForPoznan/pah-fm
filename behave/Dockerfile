FROM python:3.7

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update -y && \
    apt-get install -y google-chrome-stable chromedriver

ADD . /pah-fm/behave
WORKDIR /pah-fm/behave

RUN pip install -r requirements.txt

ENTRYPOINT tail -f /dev/null
