class SearchesController < ApplicationController

  def index
  end

  def create
    session[:long]=params[:search][:long]
    session[:lat]=params[:search][:lat]
    p session[:lat]
    p "***********"
    p session[:long]
    p "***********"
    # cll = {latitude: params[:search][:lat], longitude: params[:search][:long]}
    # p cll
    # @response = Yelp.client.search(cll, {term: 'ice cream'}, {limit: 1})
    # p @response
    redirect_to root_path
  end

  def show
  end

end
