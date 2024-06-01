let body = document.body
let statusItem = document.querySelector('.status__item')
let data = fetch('./data.json')
// console.log(data)
data
  .then((response) => {
    return response.json()
  })
  .then(sus => {
    for (let index = 0; index < sus.length; index++) {
      const element = sus[index];
      // console.log(element)
      const { id, company, logo, newAppl, featured, position, role, level, postedAt, contract, location, languages, tools } = element
      // console.log({ id, company, logo, newAppl, featured, position, role, level, postedAt, contract, location, languages, tools })
      // console.log(languages)
      let workApp = document.createElement('div')
      workApp.classList.add('filter__item')
      body.appendChild(workApp)
      workApp.innerHTML =
        ` <div class="item__info" id="block${id}">
            <img src="${logo}" alt="">
            <div class="info__job">
              <div class="job__company">
                <div class="company__featured">
                  <p class="company">${company}</p>
                </div>
                <p class="profession">${position}</p>
                <p class="job__work-time">${postedAt} - ${contract} -
                ${location}</p>
              </div>
            </div>
          </div>
          <div class="filters">
            <div class="role">
              <button class="role__btn" data-filter="${role}">${role}</button>
            </div>
            <div class="level">
              <button class="level__btn" data-filter="${level}">${level}</button>
            </div>
            ${jobLanguages(languages)}
            ${jobTools(tools)}
          </div>`
      let companyStatus = document.querySelector(`#block${id} .company__featured`)
      // console.log(companyStatus)
      let statusNew = document.createElement('p')
      let statusFeatured = document.createElement('p')
      statusNew.classList.add('job__new')
      statusNew.classList.add('job__base-status')
      statusFeatured.classList.add('job__featured')
      statusFeatured.classList.add('job__base-status')
      statusFeatured.innerHTML = "Featured"
      statusNew.innerHTML = "New"
      if (newAppl === true) {
        companyStatus.appendChild(statusNew)
        // console.log(1)
      } else {
        statusNew.remove()
        // console.log(0)
      }
      if (featured === true) {
        companyStatus.appendChild(statusFeatured)
        // console.log(1)
      } else {
        statusFeatured.remove()
        // console.log(0)
      }
    }

    let btnsLanguages = [...document.querySelectorAll('.languageBtn')]
    let btnsRole = [...document.querySelectorAll('.role__btn')]
    let btnsLevel = [...document.querySelectorAll('.level__btn')]
    let btnsTools = [...document.querySelectorAll('.toolsBtn')]
    let btns = [...btnsLanguages, ...btnsRole, ...btnsLevel, ...btnsTools]
    // console.log(btns)
    btns.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        // console.log(e.target.getAttribute('data-filter'))
        const clickedBtn = document.createElement('button')
        clickedBtn.classList.add('btnStatus')
        clickedBtn.setAttribute('data-filter', e.target.textContent)
        clickedBtn.textContent = e.target.getAttribute('data-filter')
        statusItem.appendChild(clickedBtn)
        let removeButton = document.createElement('button')
        removeButton.classList.add('removeButton')
        clickedBtn.appendChild(removeButton)
        removeButton.addEventListener('click', function () {
          clickedBtn.remove()
          console.log(0)

        })
        let filterItems = document.querySelectorAll('.filter__item')
        // console.log(filterItems)
        filterItems.forEach(filterItem => {
          // console.dir(filterItem.childNodes[3].childNodes)
          let tempSets = filterItem.childNodes[3].childNodes
          tempSets.forEach(tempSet => {
            console.dir(tempSet)
            console.log(e.target.textContent.trim().toLowerCase())
            console.log(tempSet.textContent.trim().toLowerCase())
            console.log(tempSet.textContent.trim().toLowerCase().includes(e.target.textContent.trim().toLowerCase()))
            if(tempSet.textContent.trim().toLowerCase().includes(e.target.textContent.trim().toLowerCase())){
              console.log('я остаюсь')
              filterItem.style.display = 'flex'
            } else {
              console.log('меня спрятать')
              filterItem.style.display = 'none'
            }
            // console.log(tempSet)
          });
        });
      })

    });



  })

function jobLanguages(languages) {
  const languagesInner = document.createElement('div')
  languagesInner.classList.add('languages')
  languages.forEach(language => {
    const languageBtn = document.createElement('button')
    languageBtn.classList.add('languageBtn')
    languageBtn.setAttribute('data-filter', language)
    languageBtn.textContent = language
    languagesInner.appendChild(languageBtn)
  });
  return languagesInner.outerHTML;
}
function jobTools(tools) {
  const toolsInner = document.createElement('div')
  toolsInner.classList.add('tools')
  tools.forEach(tool => {
    const toolBtn = document.createElement('button')
    toolBtn.classList.add('toolBtn')
    toolBtn.setAttribute('data-filter', tool)
    toolBtn.textContent = tool
    toolsInner.appendChild(toolBtn)
  });
  return toolsInner.outerHTML;
}


