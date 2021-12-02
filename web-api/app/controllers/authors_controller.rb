class AuthorsController < ApplicationController
  skip_before_action :authorize_request
  before_action :set_author, only: [:show, :update, :destroy]

  # GET /authors
  def index
    @authors = Author.all
    json_response(@authors)
  end

  # GET /authors/:id
  def show
    json_response(@author)
  end

  # POST /authors
  def create
    @author = Author.create!(author_params)
    json_response(@author, :created)
  end

  # PUT /authors/:id
  def update
    @author.update(author_params)
    head :no_content
  end

  # DELETE /authors/:id
  def destroy
    @author.destroy
    head :no_content
  end

  private
  def author_params
    params.permit(:name)
  end
  def set_author
    @author = Author.find(params[:id])
  end

end
