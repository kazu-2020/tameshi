class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:session][:email])
    if user&.authenticate(params[:session][:password])
      log_in(user)
      render json: user
    else
      head :unauthorized
    end
  end

  def destroy
    log_out
    head 200
  end
end
