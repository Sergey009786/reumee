import classNames from 'classnames';
import cls from './ResumeTemplate1.module.scss';
import { ResumeData } from './api/types';
import { ProfessionalPath } from './ProfessionalPath';
import React, { useEffect, useState, useRef } from 'react';
import { EducationDetails } from './EducationDetails';
import { useSetAtom } from 'jotai';
import { StepFormSlice } from '@features/FirstStepForm/slice/FirstStepFormSlice';

type ResumeTemplate1Props = {
  isShrinked?: boolean
  resumeData: ResumeData
  allowEditing?: boolean
  photo?: File | null
  contentSpace?: number
}

const ResumeTemplate1 = React.forwardRef<HTMLDivElement, ResumeTemplate1Props>(({
  isShrinked,
  resumeData,
  allowEditing,
  photo,
  contentSpace,
}, ref) => {
  const handleWritedata = useSetAtom(StepFormSlice.actions.$onFirstStepMutation);
  const contentEditableRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  const {
    name,
    role,
    experience,
    education,
    location,
    skills,
    summary,
    email,
    professionalPath,
    educationDetails,
  } = resumeData || {};
  
  const [photoUrl, setPhotoUrl] = useState<string>('');

  useEffect(() => {
    if (photo) {
      const url = URL.createObjectURL(photo);
      setPhotoUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoUrl('');
    }
  }, [photo]);

  // Also check for photo in resumeData if no direct photo prop
  const displayPhotoUrl = photoUrl || (resumeData?.photoUrl);
  const isEmpty = !name && !role && !email && !summary && (!skills || skills.length === 0) && 
                  (!professionalPath || professionalPath.length === 0) && 
                  (!educationDetails || educationDetails.length === 0);

  const handleContentEdit = (field: keyof ResumeData, value: string) => {
    if (allowEditing) {
      handleWritedata({ field, data: value });
    }
  };

  const handleBlur = (field: keyof ResumeData) => (e: React.FocusEvent<HTMLSpanElement>) => {
    const value = e.target.textContent || '';
    handleContentEdit(field, value);
  };

  const handleKeyDown = (field: keyof ResumeData) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.textContent || '';
      handleContentEdit(field, value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className={classNames(cls.resume, {
      [cls.shrinked]: isShrinked,
      [cls.placeholderContent]: isEmpty
    })}>
      <div ref={ref} style={{
        top: `${contentSpace || 0}px`,
      }} className={cls.resumeContent}>
        <div className={cls.heading}>
          <div className={cls.heading_information}>
            <div className={cls.imtext}>
              {displayPhotoUrl ? (
                <img src={displayPhotoUrl} className={classNames({
                  [cls.profilePhotoClassic]: !isShrinked,
                  [cls.profilePhotoShrinked]: isShrinked,
                })} alt="Profile" />
              ) : (
                <div className={classNames({
                  [cls.profilePhotoClassic]: !isShrinked,
                  [cls.profilePhotoShrinked]: isShrinked,
                })} style={{
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: isShrinked ? '8px' : '12px'
                }}>
                  Photo
                </div>
              )}
              <div className={cls.imgText}>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.name}
                  onBlur={handleBlur('name')}
                  onKeyDown={handleKeyDown('name')}
                  suppressContentEditableWarning={true}
                >
                  {name || (isEmpty ? "Your Name" : "")}
                </span>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.role}
                  onBlur={handleBlur('role')}
                  onKeyDown={handleKeyDown('role')}
                  suppressContentEditableWarning={true}
                >
                  {role || (isEmpty ? "Your Position" : "")}
                </span>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.notbold}
                  onBlur={handleBlur('email')}
                  onKeyDown={handleKeyDown('email')}
                  suppressContentEditableWarning={true}
                >
                  {email || (isEmpty ? "your.email@example.com" : "")}
                </span>
              </div>
            </div>
            
            {(experience || isEmpty) && (
              <div className={cls.infoName}>
                <span className={cls.bold}>Experience:</span>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.notbold}
                  onBlur={handleBlur('experience')}
                  onKeyDown={handleKeyDown('experience')}
                  suppressContentEditableWarning={true}
                >
                  {experience || (isEmpty ? "Your years of experience" : "")}
                </span>
              </div>
            )}

            {(education || isEmpty) && (
              <div className={cls.edName}>
                <span className={cls.bold}>Education:</span>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.notbold}
                  onBlur={handleBlur('education')}
                  onKeyDown={handleKeyDown('education')}
                  suppressContentEditableWarning={true}
                >
                  {education || (isEmpty ? "Your education background" : "")}
                </span>
              </div>
            )}
            
            {(location || isEmpty) && (
              <div className={cls.loName}>
                <span className={cls.bold}>Location:</span>
                <span 
                  contentEditable={allowEditing} 
                  className={cls.notbold}
                  onBlur={handleBlur('location')}
                  onKeyDown={handleKeyDown('location')}
                  suppressContentEditableWarning={true}
                >
                  {location || (isEmpty ? "Your location" : "")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={cls.mainInfo}>
          {(summary?.length || isEmpty) && (
            <div className={cls.abName}>
              <span className={cls.bold}>About Me:</span>
              <span 
                contentEditable={allowEditing} 
                className={cls.notbold}
                onBlur={handleBlur('summary')}
                onKeyDown={handleKeyDown('summary')}
                suppressContentEditableWarning={true}
              >
                {summary || (isEmpty ? "A brief description about yourself, your skills, and career objectives. This section should highlight your key strengths and what makes you unique as a professional." : "")}
              </span>
            </div>
          )}

          {(skills?.length || isEmpty) && (
            <div className={cls.skName}>
              <span className={cls.bold}>Skills:</span>
              <span 
                contentEditable={allowEditing} 
                className={cls.notbold}
                onBlur={(e) => {
                  if (allowEditing) {
                    const skillsText = e.target.textContent || '';
                    const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
                    handleWritedata({ field: 'skills', data: skillsArray });
                  }
                }}
                suppressContentEditableWarning={true}
              >
                {skills?.length ? skills.join(", ") : (isEmpty ? "JavaScript, React, Node.js, Python, SQL, Git" : "")}
              </span>
            </div>
          )}

          {(professionalPath?.length || isEmpty) && (
            <div className={cls.experience}>
              <span className={cls.work}>Work Experience</span>

              {professionalPath?.length ? (
                professionalPath.map((item, index) => (
                  <ProfessionalPath allowEditing={allowEditing} index={index} key={`${item.name}-${index}`} {...item} />
                ))
              ) : isEmpty ? (
                <div className={cls.professionalPathWrap}>
                  <div className={cls.cnName}>
                    <span className={cls.bold}>Company Name:</span>
                    <span className={cls.notbold}>Your Company Name</span>
                  </div>
                  <div className={cls.psName}>
                    <span className={cls.bold}>Position:</span>
                    <span className={cls.notbold}>Your Job Title</span>
                  </div>
                  <div className={cls.dcName}>
                    <span className={cls.bold}>Description:</span>
                    <span className={cls.notbold}>Brief description of your role and responsibilities at this company.</span>
                  </div>
                  <div className={cls.esName}>
                    <span className={cls.boldEnd}>Start Date - End Date:</span>
                    <div>
                      <span className={cls.notbold}>Jan 2020 - Present</span>
                    </div>
                  </div>
                  <div className={cls.achivName}>
                    <span className={cls.bold}>Achievements:</span>
                    <div className={cls.achievements}>
                      <div className={cls.achivLi}>Key achievement or project you completed</div>
                      <div className={cls.achivLi}>Another significant accomplishment</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {(educationDetails?.length || isEmpty) && (
            <div className={cls.experience}>
              <span className={cls.work}>Education</span>
              {educationDetails?.length ? (
                educationDetails.map((item, index) => (
                  <EducationDetails education={item} key={`${item.name}-${index}`} allowEditing={!!allowEditing} />
                ))
              ) : isEmpty ? (
                <div className={cls.educationBlock}>
                  <div className={cls.inName}>
                    <span className={cls.bold}>Institution:</span>
                    <span className={cls.notboldbold}>University Name</span>
                  </div>
                  <div className={cls.leName}>
                    <span className={cls.bold}>Degree:</span>
                    <span className={cls.notbold}>Bachelor's/Master's Degree</span>
                  </div>
                  <div className={cls.faName}>
                    <span className={cls.bold}>Field:</span>
                    <span className={cls.notbold}>Your Field of Study</span>
                  </div>
                  <div className={cls.eyName}>
                    <span className={cls.bold}>Year:</span>
                    <span className={cls.notbold}>2020</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export {
  ResumeTemplate1
}