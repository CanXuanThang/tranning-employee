import { Box, Chip, FormControl, Grid, MenuItem, Select, Stack, TextareaAutosize, Typography } from '@mui/material';
import MultipleSelectChip from './MultipleSelectChip';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppState } from '../../../../../../../../../redux/reducer';
import { API_PATHS } from '../../../../../../../../../configs/api';
import { ACCESS_TOKEN_KEY } from '../../../../../../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../../../../../utils/httpResponseCode';
import { setOtherForm } from '../../../../../../../redux/employeeReducer';
import Document from './Document';

function OtherForm() {
  const dataItem = useSelector((state: any) => state.employee.dataUpdate);
  const [formOther, setFormOther] = useState<any>({
    grade_id: '',
    benefits: [],
    remark: '',
    grade: '',
    documents: [],
  });

  const [grade, setGrade] = useState<any>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const getGray = useCallback(async () => {
    const json = await axios.get(API_PATHS.getGrade, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
      },
    });
    if (json.status === RESPONSE_STATUS_SUCCESS) {
      setGrade(json.data.data);
    }
  }, []);

  useEffect(() => {
    if (dataItem) {
      setFormOther({
        ...formOther,
        grade_id: dataItem.grade_id ? dataItem.grade_id : '',
        benefits: dataItem.benefits ? dataItem.benefits : '',
        remark: dataItem.remark ? dataItem.remark : '',
        documents: dataItem.documents ? dataItem.documents : '',
      });
    } else {
      setFormOther({
        ...formOther,
        grade_id: '',
        benefits: [],
        remark: '',
        grade: '',
        documents: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem]);

  useEffect(() => {
    getGray();
  }, [getGray]);

  useEffect(() => {
    dispatch(setOtherForm(formOther));
  }, [dispatch, formOther]);

  useEffect(() => {
    const selectedGrade = grade.find((option: any) => formOther.grade_id === option.id);
    if (selectedGrade) {
      setFormOther({ ...formOther, grade: selectedGrade });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOther.grade_id, grade, setFormOther]);

  return (
    <Box>
      <Stack
        component="form"
        direction="column"
        spacing={2}
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
          gap: '10px',
          display: 'flex',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              paddingLeft: '0 !important',
              paddingTop: '0 !important',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0 !important',
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'SVN-Sofia-Regular',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                fontSize: '16px',
              }}
            >
              Grade
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  value={formOther.grade_id}
                  onChange={(e) => setFormOther({ ...formOther, grade_id: e.target.value })}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ background: '#f1f3f5', div: { padding: '12px' } }}
                  displayEmpty
                  className="ip"
                >
                  <MenuItem value="" id="menu-item-1">
                    <em
                      style={{
                        fontSize: '16px',
                        fontFamily: 'SVN-Sofia-Regular',
                        fontStyle: 'normal',
                        color: 'rgb(104, 112, 118)',
                      }}
                    ></em>
                  </MenuItem>
                  {grade.map((option: any) => (
                    <MenuItem key={option.id} className="menu-item" value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              paddingLeft: '0 !important',
              paddingTop: '0 !important',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0 !important',
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'SVN-Sofia-Regular',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                fontSize: '16px',
              }}
            ></Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <Box sx={{ minWidth: 120 }}>
              {grade.map((option: any) => {
                if (formOther.grade_id === option.id) {
                  const benefits = option.benefits;
                  return benefits.map((benefit: any) => (
                    <Chip
                      label={benefit.name}
                      key={benefit.id}
                      sx={{
                        margin: '1px 5px',
                        borderRadius: '6px',
                        height: '24px',
                        fontFamily: 'SVN-Sofia-Regular',
                        color: 'rgb(104, 112, 118)',
                      }}
                    />
                  ));
                } else {
                  return null;
                }
              })}
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              paddingLeft: '0 !important',
              paddingTop: '0 !important',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0 !important',
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'SVN-Sofia-Regular',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                fontSize: '16px',
              }}
            >
              Benefit
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <MultipleSelectChip listBenefit={formOther} setListBenefit={setFormOther} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              paddingLeft: '0 !important',
              paddingTop: '0 !important',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0 !important',
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'SVN-Sofia-Regular',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                fontSize: '16px',
              }}
            >
              Remark
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <FormControl
              fullWidth
              variant="filled"
              sx={{
                textarea: {
                  resize: 'none',
                  padding: '17px 16px',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(241, 243, 245)',
                  border: 'none',
                  outline: 'none',
                },
              }}
            >
              <TextareaAutosize
                minRows={2}
                aria-invalid="false"
                value={formOther.remark}
                onChange={(e) => setFormOther({ ...formOther, remark: e.target.value })}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={'row'}
          sx={{ '&:first-of-type': { marginLeft: '0', marginTop: 0 }, marginTop: '0 !important' }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              paddingLeft: '0 !important',
              paddingTop: '0 !important',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0 !important',
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'SVN-Sofia-Regular',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                fontSize: '16px',
              }}
            >
              HRM User Account
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  defaultValue=""
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', div: { padding: '12px' } }}
                  displayEmpty
                  className="ip"
                  disabled
                >
                  <MenuItem value="" id="menu-item-1">
                    <em
                      style={{
                        fontSize: '16px',
                        fontFamily: 'SVN-Sofia-Regular',
                        fontStyle: 'normal',
                        color: 'rgb(104, 112, 118)',
                      }}
                    ></em>
                  </MenuItem>
                  {[].map((option: string, index: number) => (
                    <MenuItem key={index} className="menu-item" value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Document data={formOther.documents} />
    </Box>
  );
}

export default OtherForm;
