import studentDbService from '../../src/services/studentDbService';
import StudentT from '../../src/models/StudentT';

describe('studentDBService', () => {
  beforeEach(studentDbService.resetDb);
  afterEach(studentDbService.resetDb);

  it('adds a student successfully', async () => {
    const student: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const studentResult = await studentDbService.getStudent('1');

    expect(studentResult).toEqual(student);
  });

  it('adds multiple students of alphanumeric IDs successfully', async () => {
    const studentNumeric: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const studentAlpha: StudentT = await studentDbService.addStudent({
      id: 'C',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const studentNumericResult = await studentDbService.getStudent('1');
    expect(studentNumericResult).toEqual(studentNumeric);

    const studentAlphaResult = await studentDbService.getStudent('C');
    expect(studentAlphaResult).toEqual(studentAlpha);
  });

  it('adds students of different IDs, even if both students have the same name', async () => {
    const student1Expected: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student2Expected: StudentT = await studentDbService.addStudent({
      id: '2',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student1 = await studentDbService.getStudent('1');
    expect(student1).toEqual(student1Expected);

    const student2 = await studentDbService.getStudent('2');
    expect(student2).toEqual(student2Expected);
  });

  it('is able to update the class of a student', async () => {
    const studentExpected: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student = await studentDbService.getStudent('1');
    expect(student).toEqual(studentExpected);

    await studentDbService.updateStudent('1', '5');

    const studentUpdated = await studentDbService.getStudent('1');
    expect(studentUpdated.classT).toEqual('5');
  });

  it('is able to delete a student', async () => {
    const studentExpected: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student = await studentDbService.getStudent('1');
    expect(student).toEqual(studentExpected);

    await studentDbService.deleteStudent('1');

    const retrieveStudentAction = async () => {
      await studentDbService.getStudent('1');
    };

    await expect(retrieveStudentAction()).rejects.toEqual(
      `No such student id=1`,
    );
  });

  it('is unable to delete an unknown student', async () => {
    const retrieveStudentAction = studentDbService.getStudent('1');

    await expect(retrieveStudentAction).rejects.toEqual(`No such student id=1`);

    const deleteStudentAction = studentDbService.deleteStudent('1');

    await expect(deleteStudentAction).rejects.toEqual(
      `Unable to delete student, not such student ID student id=1`,
    );
  });

  it('is able to retrieve students in the same class', async () => {
    const student1: StudentT = await studentDbService.addStudent({
      id: '1',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student2: StudentT = await studentDbService.addStudent({
      id: '2',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'A',
      nationality: 'sg',
    });

    const student3: StudentT = await studentDbService.addStudent({
      id: '3',
      firstName: 'John',
      lastName: 'Tan',
      classT: 'B',
      nationality: 'sg',
    });

    const classAStudents = await studentDbService.getStudentsInClass('A');

    const classAStudentsById = Object.fromEntries(
      classAStudents.map((s) => [s.id, s]),
    );

    expect(classAStudents.length).toEqual(2);
    expect(classAStudentsById['1']).toEqual(student1);
    expect(classAStudentsById['2']).toEqual(student2);

    const classBStudents = await studentDbService.getStudentsInClass('B');

    const classBStudentsById = Object.fromEntries(
      classBStudents.map((s) => [s.id, s]),
    );

    expect(classBStudents.length).toEqual(1);
    expect(classBStudentsById['3']).toEqual(student3);
  });
});
