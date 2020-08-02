import { deepCloneSimple } from '../utils/utils';
import StudentT from '../models/StudentT';

const students = new Map();

const getStudent = async (id: string): Promise<StudentT> => {
  if (!students.has(id)) {
    return Promise.reject(`No such student id=${id}`);
  }
  return students.get(id);
};

const addStudent = async (student: StudentT): Promise<StudentT> => {
  const { id } = student;

  if (students.has(id)) {
    return Promise.reject(new Error('Student is in DB'));
  }

  students.set(id, student);
  return Promise.resolve(student);
};

const updateStudent = async (id: string, classT: string): Promise<StudentT> => {
  if (!students.has(id)) {
    return Promise.reject(`No such student id=${id}`);
  }
  const s = deepCloneSimple(students.get(id));
  s.class = classT;
  students.set(id, s);
  return s;
};

const deleteStudent = async (id: string): Promise<StudentT> => {
  const student = students.get(id);
  if (!students.has(id)) {
    return Promise.reject(
      `Unable to delete student, not such student ID student id=${id}`,
    );
  }
  students.delete(id);
  return Promise.resolve(student);
};

const getStudentsInClass = async (classId: string): Promise<StudentT[]> => {
  const studentsInClass: StudentT[] = [];

  students.forEach((s: StudentT) => {
    if (s.classT === classId) {
      studentsInClass.push(s);
    }
  });

  return Promise.resolve(studentsInClass);
};

const studentDbService = {
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsInClass,
};

export default studentDbService;
