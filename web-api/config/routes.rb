Rails.application.routes.draw do
  # namespace :v1 do
  #   get 'users/show'
  # end
  # namespace the controllers without affecting the URI
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :todos, only: :index
  end

  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    get 'user', to: 'users#show'
    put 'user', to: 'users#update'
    post 'user/new' => 'users#invite'
    post 'user/exists', to: 'users#check_user'
    post 'forgot_password' => 'passwords#forgot'
    post 'reset_password' => 'passwords#reset'

    # Honeys
    get 'honeys', to: 'honeys#index'
    post 'honeys/exists', to: 'honeys#check_honey'
    post 'honeys', to: 'honeys#create'
    delete 'honeys/:id', to: 'honeys#destroy'

    # Dewers
    get 'dewers', to: 'dewers#index'

    get 'todos/all', to: 'todos#all'
    get 'todos/complete', to: 'todos#complete'

    resources :todos do
      resources :items
    end

  end

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
  post 'acceptinvitation' => 'users#accept_invitation'
end
