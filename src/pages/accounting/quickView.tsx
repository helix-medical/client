import { Title, Grid, Paper } from '@mantine/core';
import moment from 'moment';
import cnf from '../../config/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import setNotification from '../system/errors/feedbackNotif';
import ItemQuickView from './itemQuickView';

interface ISum {
    sum: number;
    checks: number;
    cashs: number;
    cards: number;
}

const QuickView = () => {
    const now = moment().format(cnf.formatDate);
    const lastMonth = moment().subtract(1, 'months').format(cnf.formatDate);
    const lastWeek = moment().subtract(7, 'days').format(cnf.formatDate);
    const initDate = moment('1998-12-17').format(cnf.formatDate);

    const [sumMonth, setSumMonth] = useState<ISum>();
    const [sumWeek, setSumWeek] = useState<ISum>();
    const [sumAll, setSumAll] = useState<ISum>();

    useEffect(() => {
        const getSumMonth = async () => {
            try {
                const res = await axios.get(`/api/accounting/sum/${lastMonth}/${now}`);
                setSumMonth(res.data);
            } catch (error: any) {
                setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        const getSumWeek = async () => {
            try {
                const res = await axios.get(`/api/accounting/sum/${lastWeek}/${now}`);
                setSumWeek(res.data);
            } catch (error: any) {
                setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        const getSumAll = async () => {
            try {
                const res = await axios.get(`/api/accounting/sum/${initDate}/${now}`);
                setSumAll(res.data);
            } catch (error: any) {
                setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        getSumMonth();
        getSumWeek();
        getSumAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Quick View</Title>
            <Grid columns={3} align="center" p="md">
                <Grid.Col span={1}>
                    <ItemQuickView sum={sumMonth as ISum} name="This Month" />
                </Grid.Col>
                <Grid.Col span={1}>
                    <ItemQuickView sum={sumWeek as ISum} name="This Week" />
                </Grid.Col>
                <Grid.Col span={1}>
                    <ItemQuickView sum={sumAll as ISum} name="All Time" />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default QuickView;