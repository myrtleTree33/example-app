import studentDbService from './studentDbService';
import StudentT from '../models/StudentT';
import { logger } from '../utils/logger';

const getStudent = async (id: string) => {
  try {
    const student = await studentDbService.getStudent(id);
    return Promise.resolve(student);
  } catch (e) {
    logger.error('Unable to retrieve student');
    logger.error(e);
    return Promise.reject(e);
  }
};

const addStudent = async (student: StudentT): Promise<StudentT> => {
  try {
    const studentRes = await studentDbService.addStudent(student);
    return Promise.resolve(studentRes);
  } catch (e) {
    logger.error('Unable to add student');
    logger.error(e);
    return Promise.reject(e);
  }
};

const updateStudent = async (id: string, classT: string): Promise<StudentT> => {
  try {
    const student = await studentDbService.updateStudent(id, classT);
    return Promise.resolve(student);
  } catch (e) {
    logger.error('Unable to update student');
    logger.error(e);
    return Promise.reject(e);
  }
};

const deleteStudent = async (id: string): Promise<StudentT> => {
  try {
    const student = await studentDbService.deleteStudent(id);
    return Promise.resolve(student);
  } catch (e) {
    logger.error('Unable to delete student');
    logger.error(e);
    return Promise.reject(e);
  }
};

const getStudentsInClass = async (classId: string): Promise<StudentT[]> => {
  try {
    const students = await studentDbService.getStudentsInClass(classId);
    return Promise.resolve(students);
  } catch (e) {
    logger.error('Error occurred, while retrieving students in class');
    logger.error(e);
    return Promise.reject(e);
  }
};

const studentService = {
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsInClass,
};

export default studentService;
