class SearchesController < ApplicationController

  def create
    session[:long]=params[:search][:long]
    session[:lat]=params[:search][:lat]
    redirect_to root_path
  end
end
