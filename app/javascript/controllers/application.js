import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

export { application }

window.metaContent = function (name) {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element && element.content
}