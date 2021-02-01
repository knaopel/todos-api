FROM ruby:2.7.1
# RUN apt-get update -qq && apt-get install -y nodejs npm sqlite3 postgresql-client
RUN apt-get update -qq && apt-get install -y nodejs sqlite3 postgresql-client
# RUN npm install -g yarn
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler:2.2.6
RUN bundle install
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# # Start the main proccess.
CMD ["rails", "server", "-b", "0.0.0.0"]