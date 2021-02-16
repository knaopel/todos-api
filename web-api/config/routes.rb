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
    get 'user/following', to: 'users/follows#index', as: :following
    get 'user/followers', to: 'users/follows#index2', as: :followers
    post 'user/follow', to: 'users/follows#create', as: :follow
    delete 'user/unfollow', to: 'users/follows#destroy', as: :unfollow
    post 'user/exists', to: 'users/follows#check_follower', as: :exists

    # Honeys
    get 'honeys', to: 'honeys#index'
    post 'honeys/exists', to: 'honeys#check_honey'
    post 'honeys', to: 'honeys#create'
    delete 'honeys/:id', to: 'honeys#destroy'

    # Dewers
    get 'dewers', to: 'dewers#index'

    resources :todos do
      resources :items
    end      
  end


  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
