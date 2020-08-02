import { Router } from 'express';
import { param, body } from 'express-validator';
import { validateReq } from '../middleware/validateReq';
import studentService from '../services/studentService';

const routes = Router();

routes.get('/:id', [param('id').isString()], validateReq, async (req, res) => {
  const { id } = req.params;
  const student = await studentService.getStudent(id);
  res.json(student);
});

routes.post(
  '/',
  [
    body('id').isString(),
    body('firstName').isString(),
    body('lastName').isString(),
    body('class').isString(),
    body('nationality').isString(),
  ],
  validateReq,
  async (req, res) => {
    const { id, firstName, lastName, nationality } = req.body;
    const classT = req.body['class'];
    const student = await studentService.addStudent({
      id,
      firstName,
      lastName,
      nationality,
      classT,
    });
    res.json(student);
  },
);

routes.put(
  '/',
  [body('id').isString(), body('class').isString()],
  validateReq,
  async (req, res) => {
    const id = req.body['id'];
    const classT = req.body['class'];
    const student = await studentService.updateStudent(id, classT);
    res.json(student);
  },
);

routes.delete(
  '/:id',
  [param('id').isString()],
  validateReq,
  async (req, res) => {
    const { id } = req.params;
    const student = await studentService.deleteStudent(id);
    res.json(student);
  },
);

export default routes;
