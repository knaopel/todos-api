module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  # define custom error subclass - rescue catches `StandardErrors`
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class ExpiredToken < StandardError; end
  
  included do
    # define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::ExpiredToken, with: :four_zero_one

    rescue_from ActiveRecord::RecordNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end
  end

  private

  # JSON response with message; status code 422 - unprocessable entity
  def four_zero_one(e)
    json_response({ message: e.message }, :unauthorized)
  end
  def four_twenty_two(e)
    json_response({ message: e.message }, :unprocessable_entity)
  end

  def unauthorized_request(e)
    json_response({ message: e.message }, :unauthorized)
  end
end