module ControllerSpecHelper
  # generate tokens from user id
  def token_generator(user_id)
    JsonWebToken.encode(user_id: user_id)
  end

  # generate expired tokens from user id
  def expired_token_generator(user_id)
    JsonWebToken.encode({ user_id: user_id }, (Time.now.to_i - 10))
  end

  # return valid headers
  def valid_headers
    {
      'Authorization' => token_generator(user.id),
      'Content-Type' => 'application/json',
    }
  end

  # return valid v1 headers
  def valid_v1_headers
    {
      'Authorization' => token_generator(user.id),
      'Content-Type' => 'application/json',
      'Accept' => 'application/vnd.todos.v1+json',
    }
  end

  # return valid v2 headers
  def valid_v2_headers
    {
      'Authorization' => token_generator(user.id),
      'Content-Type' => 'application/json',
      'Accept' => 'application/vnd.todos.v2+json',
    }
  end

  # return invalid headers
  def invalid_headers
    { 'Authorization' => nil, 'Content-Type' => 'application/json' }
  end
end
