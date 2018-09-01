FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN useradd -ms /bin/bash triaguser
USER triaguser
WORKDIR /home/triaguser
ADD jdk-8u181-linux-x64.tar.gz /home/triaguser
ENV JAVA_HOME /home/triaguser/jdk1.8.0_181
ENV PATH $JAVA_HOME/bin:$PATH
ADD elasticsearch.tar.gz /home/triaguser
ADD kibana.tar.gz /home/triaguser
ADD logstash-6.3.2 /home/triaguser
ADD build.tar.gz /home/triaguser
COPY core /home/triaguser
WORKDIR /home/triaguser/core
ADD syslog /home/triaguser
RUN chmod 0777 /home/triaguser/syslog
RUN npm install
RUN npm run build
WORKDIR /home/triaguser
RUN chmod 0777 /home/triaguser/build.sh
CMD /home/triaguser/build.sh





