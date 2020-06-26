import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const duplicatedDateAppointment = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (duplicatedDateAppointment) {
    return res.status(400).json({ error: 'This date is already booked' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
