json.extract! user, :id, :mobi, :name, :email, :status, :adm, :created_at, :updated_at
json.url user_url(user, format: :json)
