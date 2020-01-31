import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ExaminationSystem from './ExaminationSystem';

ReactDOM.render(<ExaminationSystem />, document.getElementById('root'));


//При открытой форме при клике вне формы форма закроется
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("active")) {
        document.querySelector('.new-card form').classList.add('hidden');
        document.querySelector('.view-form').classList.remove('hidden');
        e.target.classList.remove('active');
    }
});

serviceWorker.unregister();
