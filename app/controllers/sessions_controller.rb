#encoding:utf-8

class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(mobi: params[:mobi],status: "1")
    if user
      session["user_id"] = user.id
      if user.adm == "1"
        render "admin/index"
      else
        render "lab/index"
      end
    else
      redirect_to login_url, alert: "手机号或密码不正确!"
    end
  end

  def destroy
  end
end
