class WelcomeController < ApplicationController
  def index
    @search= Search.new
  end

  def create
    session[:long]=params[:search][:long]
    session[:lat]=params[:search][:lat]
    binding.pry
    redirect_to root_path
  end
end
