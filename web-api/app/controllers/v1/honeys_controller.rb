class V1::HoneysController < ApplicationController
  before_action :set_user, only: [:create, :check_honey]

  # GET /honeys
  def index
    json_response(current_user.honeys)
  end

  # POST /honeys/exists
  def check_honey
    if @user
      json_response({exists: true})
    else
      json_response({exists: false, searched_for_email: @email}, 422)
    end
  end

  # POST /honeys
  def create
    if @user
      if current_user.id == @user.id or current_user.is_honey?(@user.id)
        json_response(current_user.honeys, 422)
      else
        if current_user.add_honey(@user.id)
          json_response(current_user.honeys)
        else
          json_response({error:"Could not add honey"}, 500)
        end
      end
    else
      json_response({error: "user not found"}, 422)
    end
  end

  # DELETE /honeys/:id
  def destroy
    honey_id = params[:id].to_i
    if has_honey?(honey_id)
      current_user.unhoney(honey_id)
      head :no_content
    else
      json_response({error: "user not found"}, :not_found)
    end
  end

  private

  def set_user
    @email = params[:email]
    @user = User.find_by_email(@email)
  end

  def has_honey?(honey_id)
    current_user.honeys.each do |h|
      if h.id == honey_id
        return true
      end
    end
    return false
  end
end
