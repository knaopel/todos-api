class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # service entry point
  def call
    JsonWebToken.encode(user_id: user.id)
  end

  private

  attr_reader :email, :password

  # verify user credentials
  def user
    user = User.find_by(email: email)
    return user if user && user.authenticate(password)
    # raise authentication error if credentials are invalid
    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end
end