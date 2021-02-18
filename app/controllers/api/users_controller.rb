class Api::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(set_user)
    if user.save
      head 200
    else
      render json: user.errors.full_messages, status: :bad_request
    end
  end

  def me
    render json: current_user
  end

  private

  def set_user
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
