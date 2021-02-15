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
    post 'user/follow', to: 'users/follows#create', as: :follow
    delete 'user/unfollow', to: 'users/follows#destroy', as: :unfollow
    post 'user/userexists', to: 'users/follows#check_follower', as: :userexists

    resources :todos do
      resources :items
    end      
  end


  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
