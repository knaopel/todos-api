class V1::DewersController < ApplicationController
  before_action :set_user, only: [:create]

  # GET /dewers
  def index
    json_response(current_user.dewers)
  end

  # POST /dewers
  def create
    # byebug
    if @user
      if current_user.id == @user.id or @user.is_dewer?(current_user.id)
        json_response(current_user.dewers, :unprocessable_entity)
      else
        if current_user.add_dewer(@user.id)
          json_response(current_user.dewers)
        else
          json_response(
            { error: 'Could not add dewer' },
            :internal_server_error,
          )
        end
      end
    else
      json_response({ error: 'User not found' }, :unprocessable_entity)
    end
  end

  # DELETE /dewers/:id
  def destroy
    dewer_id = params[:id].to_i
    if has_dewer?(dewer_id)
      current_user.undewer(dewer_id)
      head :no_content
    else
      json_response({ error: 'User not found' }, :not_found)
    end
  end

  private

  def set_user
    email = params[:email]
    @user = User.find_by_email email
  end

  def has_dewer?(id)
    current_user.dewers.each { |d| return true if d.id == id }
    return false
  end
end
