FROM python:3.7

EXPOSE 8000

ADD wait-for-it.sh /usr/bin/wait-for-it
RUN chmod a+x /usr/bin/wait-for-it

RUN mv /usr/local/lib/python3.7/site-packages /usr/local/lib/python3.7/site-packages-backup
ADD . /pah-fm/backend

WORKDIR /pah-fm/backend
