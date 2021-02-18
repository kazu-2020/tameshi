class ApplicationController < ActionController::Base
  include Api::UserAuthenticator
end
