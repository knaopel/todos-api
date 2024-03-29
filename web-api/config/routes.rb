Rails.application.routes.draw do
  # namespace :v1 do
  #   get 'users/show'
  # end
  # namespace the controllers without affecting the URI
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :todos, only: :index
  end

  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    # user
    post 'signup', to: 'users#create'
    get 'user', to: 'users#show'
    put 'user', to: 'users#update'
    post 'user/invite' => 'users#invite'
    post 'acceptinvitation' => 'users#accept_invitation'
    post 'user/exists', to: 'users#check_user'

    #authentication
    post 'auth/login', to: 'authentication#authenticate'

    # passwords
    post 'forgot_password' => 'passwords#forgot'
    post 'reset_password' => 'passwords#reset'

    # Honeys
    get 'honeys', to: 'honeys#index'
    post 'honeys/exists', to: 'honeys#check_honey'
    post 'honeys', to: 'honeys#create'
    delete 'honeys/:id', to: 'honeys#destroy'

    # Dewers
    get 'dewers', to: 'dewers#index'
    post 'dewers', to: 'dewers#create'
    delete 'dewers/:id', to: 'dewers#destroy'

    get 'todos/all', to: 'todos#all'
    get 'todos/complete', to: 'todos#complete'

    resources :todos do
      resources :items
    end
  end
end
