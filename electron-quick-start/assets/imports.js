const links = document.querySelectorAll('link[rel="import"]')

console.log('importing sections')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.task-template')
  let clone = document.importNode(template.content, true)
  /* if (link.href.match('login.html')) {
    document.querySelector('body').appendChild(clone)
  } else {
    document.querySelector('.content').appendChild(clone)
  } */

  document.querySelector('.content').appendChild(clone)
  
})

