# frozen_string_literal: true

class PrimaryLinkButtonComponent < ViewComponent::Base
  private attr_reader :title, :path, :button_classes, :small, :data, :target

  def initialize(path:, title:, button_classes: nil, small: false, data: nil, target: nil)
    @title = title
    @path = path
    @button_classes = button_classes
    @small = small
    @data = data
    @target = target
  end

  def call
    link_to title, path, class: classes, data: data, target: target
  end

  private

  def classes
    "#{button_classes} flex items-center justify-center rounded-md border border-transparent bg-indigo-600 #{padding_classes} text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
  end

  def padding_classes
    small ? "px-2 py-1" : "px-4 py-3"
  end
end
