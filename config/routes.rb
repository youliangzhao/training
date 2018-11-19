Rails.application.routes.draw do

  root 'users#home'
  
  get 'admin/index'

	controller :sessions do
    get 'login' => :new
    post 'login' => :create
    get 'logout' => :destroy
  end

  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'lab/index'
  get 'lab/kaipiao' 
  get 'lab/buy' 
  get 'lab/invMgmt'

end
