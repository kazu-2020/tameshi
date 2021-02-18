Rails.application.routes.draw do
  namespace :api, format: 'json' do
    resources :users, only: %i[index create] do
      get 'me', on: :collection
    end
    resource :sessions, only: %i[create destroy]
  end

  get '*path', to: 'static_pages#top'
  root 'static_pages#top'
end
