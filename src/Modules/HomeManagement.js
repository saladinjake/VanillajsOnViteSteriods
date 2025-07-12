import {
  seedMockDatabase,
  pickRandomSubset,
  getMockDatabaseCourses,
} from '../Plugins/db/init';

const courseTrack = document.getElementById('course-track');
const courseCards = courseTrack.children;
const courseWidth = 320 + 24; // card width + gap
let courseIndex = 0;

// featured course

const featuredCourses = pickRandomSubset(getMockDatabaseCourses(), 450);
let visibleCourses = [];
let page = 1;
const perPage = 6;

const grid = document.getElementById('course-grid');
const searchInput = document.getElementById('course-search');
const sentinel = document.getElementById('scroll-sentinel');

//

function updateCourseCarousel() {
  const offset = -(courseIndex * courseWidth);
  courseTrack.style.transform = `translateX(${offset}px)`;
}

function nextCourseSlide() {
  if (courseIndex < courseCards.length - 1) {
    courseIndex++;
  } else {
    courseIndex = 0;
  }
  updateCourseCarousel();
}

function prevCourseSlide() {
  if (courseIndex > 0) {
    courseIndex--;
  } else {
    courseIndex = courseCards.length - 1;
  }
  updateCourseCarousel();
}

function renderCarouselCourse() {
  const selectedCarousel = pickRandomSubset(getMockDatabaseCourses(), 40);
  const carousel = document.getElementById('course-track');
  for (let i = 0; i < selectedCarousel.length; i++) {
    const course = selectedCarousel[i];
    const div = document.createElement('div');
    div.className = 'bg-white rounded-xl shadow-sm w-80 flex-shrink-0';
    const singleCard = `
         <div class="card bg-white rounded-xl shadow-sm w-80 flex-shrink-0">
              <img src="${course.image}" class="rounded-t-xl w-full" alt="${course.title}" />
        <div class="p-4">
         <h3 class="text-md font-semibold mb-2 text-black">${course.title}</h3>
        <span class="text-md  mb-3 text-black">${`${course.description.substring(0, 140)}...`}</span>
          <p class="text-xs text-muted">By ${course.instructor}</p>
          <button class="mt-4 w-full p-4  border-border bg-red"  data-action="viewCourse"
            data-id="${course.id}">View Course</button>
              </div>
            </div>
        `;
    div.innerHTML = singleCard;
    carousel.appendChild(div);
  }
}

// logo backer slider

const track = document.getElementById('carousel-track');
const logos = track.children;
const logoWidth = 144; // 120px + 24px gap
let currentIndex = 0;

function updateCarousel() {
  const offset = -(currentIndex * logoWidth);
  track.style.transform = `translateX(${offset}px)`;
}

export function nextSlide() {
  if (currentIndex < logos.length - 4) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

export function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = logos.length - 4;
  }
  updateCarousel();
}

function filterCourses(query) {
  return featuredCourses.filter((course) =>
    (course.title + course.description + course.category)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
}

function loadCourses(reset = false) {
  const query = searchInput.value.trim();
  if (reset) {
    grid.innerHTML = '';
    page = 1;
    visibleCourses = filterCourses(query);
  }

  const start = (page - 1) * perPage;
  const end = page * perPage;
  const courses = visibleCourses.slice(start, end);

  courses.forEach((course, id) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.className = 'bg-white rounded-xl shadow-sm w-full ';
    card.innerHTML = `
        <img src="${course.image}" class="rounded-t-xl w-full" alt="${course.title}" />
        <div class="p-4">
            <h3 class="text-md font-semibold mb-2 text-black">${course.title}</h3>
        <span class="text-md  mb-3 text-black">${`${course.description.substring(0, 140)}...`}</span>
          <p class="text-xs text-muted">By ${course.instructor}</p>
          <button class="mt-4 w-full p-4  border-border bg-red" 
            data-action="viewCourse"
            data-id="${course.id}"
          >View Course</button>
        </div>

        
      `;
    grid.appendChild(card);
  });
  page++;
}

const categoryGroups = {
  Development: [
    { name: 'Web Development', icon: 'fa fa-code' },
    { name: 'Mobile Development', icon: 'fa fa-phone' },
    { name: 'Game Development', icon: 'fa fa-controls' },
    { name: 'Software Engineering', icon: 'fa fa-engine' },
  ],
  Design: [
    { name: 'UI/UX Design', icon: 'fa fa-home' },
    { name: 'Product Design', icon: 'fa fa-home' },
    { name: 'Motion Graphics', icon: 'fa fa-home' },
    { name: '3D Design', icon: 'fa fa-home' },
  ],
  Marketing: [
    { name: 'Digital Marketing', icon: 'fa fa-home' },
    { name: 'SEO', icon: '🔍' },
    { name: 'Email Marketing', icon: 'fa fa-email' },
    { name: 'Content Strategy', icon: 'fa fa-media' },
  ],
  Business: [
    { name: 'Entrepreneurship', icon: 'fa fa-user' },
    { name: 'Leadership', icon: 'fa fa-user' },
    { name: 'Finance', icon: 'fa fa-money' },
    { name: 'Project Management', icon: 'fa fa-portfolio' },
  ],
};

export function toggleMegaMenu() {
  const menu = document.getElementById('megaMenu');
  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden', isOpen);
  if (!isOpen) renderCategoryGroups();
}

function renderCategoryGroups(filter = '') {
  const container = document.getElementById('categoryGroupsContainer');
  container.innerHTML = '';

  for (const [group, items] of Object.entries(categoryGroups)) {
    const groupBlock = document.createElement('div');

    const filtered = items.filter((cat) =>
      cat.name.toLowerCase().includes(filter.toLowerCase()),
    );
    if (filtered.length === 0) continue;

    groupBlock.innerHTML = `
    <h3 class="font-semibold mb-2 text-gray-700">${group}</h3>
    <ul class="space-y-1">
      ${filtered
        .map(
          (cat) => `
        <li class="category-pill flex items-center gap-2  hover:bg-gray-200 px-3  mb-3 py-2 rounded cursor-pointer">
          <span class="text-lg ${cat?.icon}"></span>
          <span>${cat.name}</span>
        </li>
      `,
        )
        .join('')}
    </ul>
  `;
    container.appendChild(groupBlock);
  }
}

export function filterCategories(text) {
  renderCategoryGroups(text);
}

function toggleFaq(el) {
  const answer = el.querySelector('.faq-answer');
  answer.classList.toggle('hidden');
}

// MEGA MENU
// HOME PAGE COMPONENT
export function init(params) {
  // load default db for demo from local storage

  seedMockDatabase();

  requestAnimationFrame(() => {
    // Auto slide every 3 seconds
    setInterval(nextSlide, 3000);
    setTimeout(() => renderCarouselCourse(), 2000);
    // // Autoplay every 4s
    setInterval(nextCourseSlide, 4000);

    //  Handle live search
    searchInput.addEventListener('input', () => {
      visibleCourses = filterCourses(searchInput.value);
      loadCourses(true);
    });

    //  IntersectionObserver for infinite scroll
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          page * perPage <= visibleCourses.length
        ) {
          loadCourses();
        }
      },
      {
        rootMargin: '100px',
      },
    );

    observer.observe(sentinel);
  });

  // 🔁 Initial setup
  visibleCourses = featuredCourses;
  loadCourses(true);

  //  action in html string will work like this
  return {
    viewCourse: ({ event, dataset }) => {
      const courseId = dataset.id;
      // Navigate to course

      const course = featuredCourses.find(
        (c) => parseInt(c.id) == parseInt(courseId),
      );
      if (!course) return alert('Course not found!');

      localStorage.setItem('selected_course', JSON.stringify(course));
      return (location.hash = `#course_detail/${courseId}`);
    },
    prevSlide: () => prevSlide(),
    nextSlide: () => nextSlide(),
    toggleMegaMenu,
    filterCategories: ({ event, dataset }) => {
      return filterCategories(dataset.searchQuery);
    },
    toggleFaq: ({ event, element }) => toggleFaq(element),
  };
}
