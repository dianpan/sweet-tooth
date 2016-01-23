class WelcomeController < ApplicationController
  def index
<<<<<<< HEAD
    @search =
=======
    @search= Search.new
  end

  def create
    session[:long]=params[:search][:long]
    session[:lat]=params[:search][:lat]
    binding.pry
    redirect_to root_path
>>>>>>> get rid of binding.pry
  end
end
