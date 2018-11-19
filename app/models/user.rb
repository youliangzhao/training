class User < ApplicationRecord
  validates :mobi, uniqueness: true
  has_secure_password
end
