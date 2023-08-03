# frozen_string_literal: true

class Menus::LinkComponent < ViewComponent::Base
  private attr_reader :title, :path, :data, :id, :active

  def initialize(title, path, active: false, data: nil, id: nil)
    @title = title
    @path = path
    @data = data
    @id = id
    @active = active
  end

  def call
    link_to title, path, class: classes, data: data, id: id
  end

  private

  def classes
    if active
      "border-indigo-500 text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
    else
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
    end
  end
end
