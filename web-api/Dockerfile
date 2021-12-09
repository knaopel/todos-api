FROM ruby:3.0.2

RUN apt-get update -qq && apt-get install -y postgresql-client

WORKDIR /myapp
COPY Gemfile* /myapp/
RUN bundle install

COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin

EXPOSE 5000

# Start the main proccess.
CMD ["rails", "server", "-b", "0.0.0.0"]