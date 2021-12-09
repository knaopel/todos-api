module V1
  class TodosController < ApplicationController
    before_action :set_todo, only: [:show, :update, :destroy]

    # GET /todos
    def index
      @todos = current_user.todos.where(is_completed: false)
      # @todos = current_user.todos.paginate(page: params[:page], per_page: 50)
      json_response(@todos)
    end

    # GET /todos/all
    def all
      @todos = current_user.todos.all
      json_response(@todos)
    end

    # GET /todos/complete
    def complete
      @todos = current_user.todos.where(is_completed:true)
      json_response(@todos)
    end

    # GET /todos/:id
    def show
      json_response(@todo)
    end

    # POST /todos
    def create
      @todo = current_user.todos.create!(todo_params)
      json_response(@todo, :created)
    end

    # PUT /todos/:id
    def update
      @todo.update(todo_params)
      json_response(@todo, :accepted)
    end

    # DELETE /todos/:id
    def destroy
      @todo.destroy
      head :no_content
    end

    private
    def todo_params
      # whitelist params
      params.permit(:title, :body, :is_completed)
    end

    def set_todo
      @todo = Todo.find(params[:id])
    end
  end
end