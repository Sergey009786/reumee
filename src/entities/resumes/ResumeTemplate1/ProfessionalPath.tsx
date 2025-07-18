import classNames from 'classnames';
import { ProfessionalExperience } from './api/types';
import cls from './ResumeTemplate1.module.scss';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { StepFormSlice } from '@features/FirstStepForm/slice/FirstStepFormSlice';

type ProfessionalPathProps = ProfessionalExperience & {
    allowEditing?: boolean;
    index?: number;
}

function ProfessionalPath({
    name,
    description,
    startWork,
    endWork,
    role,
    achievements,
    allowEditing,
    responsibilities,
    index = 0,
}: ProfessionalPathProps) {
    const handleWritedata = useSetAtom(StepFormSlice.actions.$handleWriteProfessionalExperienceChangeIndex);
    
    const handleContentEdit = (property: keyof ProfessionalExperience, value: string | string[]) => {
        if (allowEditing) {
            handleWritedata({ index, property, value });
        }
    };

    return (
        <div className={cls.professionalPathWrap}>
            <div className={cls.cnName}>
                <span className={cls.bold}>Company Name:</span>
                <span 
                    className={classNames(cls.notbold)} 
                    contentEditable={allowEditing}
                    onBlur={(e) => handleContentEdit('name', e.target.textContent || '')}
                    suppressContentEditableWarning={true}
                >
                    {name}
                </span>
            </div>
            <div className={cls.psName}>
                <span className={cls.bold}>Position:</span>
                <span 
                    className={classNames(cls.notbold)} 
                    contentEditable={allowEditing}
                    onBlur={(e) => handleContentEdit('role', e.target.textContent || '')}
                    suppressContentEditableWarning={true}
                >
                    {role}
                </span>
            </div>
            <div className={cls.dcName}>
                <span className={cls.bold}>Description:</span>
                <span 
                    contentEditable={allowEditing} 
                    className={cls.notbold}
                    onBlur={(e) => handleContentEdit('description', e.target.textContent || '')}
                    suppressContentEditableWarning={true}
                >
                    {description}
                </span>
            </div>
            <div className={cls.esName}>
                <span className={cls.boldEnd}>End Date - Start Date</span>
                <div>
                <span 
                    contentEditable={allowEditing} 
                    className={cls.notbold}
                    onBlur={(e) => handleContentEdit('startWork', e.target.textContent || '')}
                    suppressContentEditableWarning={true}
                >
                    {dayjs(startWork).isValid() ? startWork : 'Start Date'}
                </span>
                {" "}
                {"-"}
                {" "}
                <span 
                    contentEditable={allowEditing} 
                    className={cls.notbold}
                    onBlur={(e) => handleContentEdit('endWork', e.target.textContent || '')}
                    suppressContentEditableWarning={true}
                >
                    {dayjs(endWork).isValid() || endWork === "настоящее время" ? endWork : 'End Date'}
                </span>
                </div>
            </div>

            <div className={cls.respName}>
                <span className={cls.bold}>Responsibilities:</span>
                <ul className={cls.achievements}>
                    {responsibilities.map((responsibility, index) => (
                        <li 
                            key={index}
                            className={cls.achivLi} 
                            contentEditable={allowEditing}
                            onBlur={(e) => {
                                const newResponsibilities = [...responsibilities];
                                newResponsibilities[index] = e.target.textContent || '';
                                handleContentEdit('responsibilities', newResponsibilities);
                            }}
                            suppressContentEditableWarning={true}
                        >
                            {responsibility}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cls.achivName}>
                <span className={cls.bold}>Achievements:</span>
                <ul className={cls.achievements}>
                    {achievements.map((achievement, index) => (
                        <li 
                            key={index}
                            className={cls.achivLi} 
                            contentEditable={allowEditing}
                            onBlur={(e) => {
                                const newAchievements = [...achievements];
                                newAchievements[index] = e.target.textContent || '';
                                handleContentEdit('achievements', newAchievements);
                            }}
                            suppressContentEditableWarning={true}
                        >
                            {achievement}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export {
    ProfessionalPath
}