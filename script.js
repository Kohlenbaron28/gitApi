const wrapp = document.querySelector('.wrapper');
const formEl = document.createElement('form');
const inputEl = document.createElement('input');
const ulEl = document.createElement('ul');
const sections = document.createElement('div');
sections.classList.add('search-sections');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');
formEl.appendChild(inputEl);
formEl.appendChild(ulEl);
wrapp.appendChild(formEl);
wrapp.appendChild(sections);
formEl.classList.add('search');

const debouncedGetRepo = debounce(getRepo, 400);
formEl.addEventListener('input', debouncedGetRepo)


function debounce (fn, ms) {
    let timeout;
    return function() {
        const fnCall = () => {fn.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}

async function getRepo(e) {
   let inputValue = e.target.value;
   let fetched = await new Promise((resolve) => {
    fetch(` https://api.github.com/search/repositories?q=${inputValue}&per_page=5`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(rep => resolve(rep));
   });
   ulEl.innerHTML = '';
    let api = await fetched.items;
    console.log(api) 
    let names = await api.forEach((obj)=> {
        let li = document.createElement('li');
        li.classList.add('search-li');
       ulEl.appendChild(li);
       li.innerHTML = `${obj.name}`;
       li.addEventListener('click', function() {
           ulEl.innerHTML = '';
           let sectionsDiv = document.createElement('div');
           sectionsDiv.classList.add('sectionsDiv');
           let sectionsDivMain = document.createElement('div');
           sectionsDivMain.classList.add('sectionsDiv__main');
           let sectionsDivMainSpan = document.createElement('div');
           sectionsDivMainSpan.classList.add('sectionsDiv__main_span');
           let sectionsDivItem1 = document.createElement('div');
           let sectionsDivItem2 = document.createElement('div');
           let sectionsDivItem3 = document.createElement('div');
           sectionsDivItem1.innerHTML = `Name: ${obj.name}`;
           sectionsDivItem2.innerHTML = `Owner: ${obj.owner.login}`;
           sectionsDivItem3.innerHTML = `Stars: ${obj.stargazers_count}`;
           sectionsDivMain.appendChild(sectionsDivItem1);
           sectionsDivMain.appendChild(sectionsDivItem2);
           sectionsDivMain.appendChild(sectionsDivItem3);
           sectionsDiv.appendChild(sectionsDivMain);
           sectionsDiv.appendChild(sectionsDivMainSpan);
           sections.appendChild(sectionsDiv);
           sectionsDivMainSpan.addEventListener('click', function() {
               sectionsDiv.remove()
           })
       })
        })
        }
 
