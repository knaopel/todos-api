class V1::DewersController < ApplicationController
  # GET /dewers
  def index
    json_response(current_user.dewers)
  end
end
