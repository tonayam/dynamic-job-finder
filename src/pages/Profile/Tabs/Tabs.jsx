import { BiUser } from 'react-icons/bi';
import { RiEditCircleFill, RiEditLine } from 'react-icons/ri';

export const ProfileTab = () => {
  return (
    <section className='tab-content profile-tab'>
      {/* TAB TITLES */}
      <div className='titles-section'>
        <h2 className='title'>Profile</h2>
        <h2 className='sub-title'>Community Profile</h2>
        <p>
          This is how you will appear when you participate in conversations on
          Dynamic Job Finder
        </p>
      </div>

      {/* USER PROFILE IMAGE AND NAME */}
      <div className='user'>
        <div className='img'>
          <BiUser />
          <RiEditCircleFill className='edit' />
        </div>
        <div className='name'>
          <h2>John Doe</h2>
        </div>
      </div>

      {/* EMPLOYMENT STATUS */}
      <div className='employment-status'>
        <span>Status</span>
        <select name='status' id='status'>
          <option value='employed' defaultChecked>
            Employed
          </option>
          <option value='unemployed' defaultChecked>
            Unemployed
          </option>
        </select>
      </div>

      {/* RELEVANT INFO */}
      <div className='relevant-info'>
        <div className='item'>
          <h4 className='title'>Primary Industry</h4>
          <div className='info'>
            <p>Tech</p>
            <RiEditLine />
          </div>
        </div>
        <div className='item'>
          <h4 className='title'>Industry Category</h4>
          <div className='info'>
            <p>Engineering</p>
            <RiEditLine />
          </div>
        </div>
        <div className='item'>
          <h4 className='title'>Job title</h4>
          <div className='info'>
            <p>Frontend Developer</p>
            <RiEditLine />
          </div>
        </div>
        <div className='item'>
          <h4 className='title'>Current Company</h4>
          <div className='info'>
            <p>Astrosoft groups</p>
            <RiEditLine />
          </div>
        </div>
        <div className='item'>
          <h4 className='title'>Location</h4>
          <div className='info'>
            <p>Port Harcourt (Nigeria)</p>
            <RiEditLine />
          </div>
        </div>
      </div>

      {/* JOB PREFERENCES */}
      <div className='job-preferences'>
        <h4 className='title'>Job Preferences</h4>
        <p>
          Tell us what you're looking for so we can customize your job hunting
          experience!
        </p>

        <div className='remote-work'>
          <input type='checkbox' />
          <span>I am open to remote work</span>
        </div>
        <div className='desired-job-title'>
          <div className='add'>+</div>
          <span>Add desired job title</span>
        </div>
        <div className='desired-location'>
          <div className='add'>+</div>
          <span>Add desired job location</span>
        </div>
      </div>
    </section>
  );
};
