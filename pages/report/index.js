import ReportCard from '@/components/reports/ReportCard';
import { Add, AddCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

export default function ViewReports({ reports, user }) {
  /**
   * TODO: user type implementation
   */
  const [userType, setUserType] = useState('doctor');
  let isDoctor = userType === 'doctor';

  const [filtered, setFiltered] = useState(reports);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  const resolve = (reportId) => {
    if (isDoctor) return;

    let newReports = [...filtered];
    newReports = newReports.map((report) => {
      if (report._id === reportId) {
        report.resolved = true;
      }
      return report;
    });

    setFiltered(newReports);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Typography variant="h4" component="span">
          {isDoctor ? 'My Reports' : 'Reports'}
        </Typography>
        {isDoctor && !mobileView && (
          <Button variant="contained" startIcon={<AddCircleOutline />}>
            New
          </Button>
        )}
      </Box>
      <Switch
        checked={isDoctor}
        onChange={() => setUserType(isDoctor ? 'consultant' : 'doctor')}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Paper elevation={2} sx={{ p: 5, mb: 5 }}>
        <Grid
          container
          id="reports-grid"
          spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        >
          {filtered.map((report, index) => (
            <ReportCard
              key={index}
              report={report}
              isDoctor={isDoctor}
              resolve={resolve}
            />
          ))}
        </Grid>
      </Paper>
      {isDoctor && mobileView && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const reports = [
    {
      _id: '632e63375a6845d0ae14c740',
      subject: 'Subject 1',
      body: 'Cupidatat ut cillum nulla mollit aute. Ad magna adipisicing ut eiusmod cupidatat aliqua in velit do nulla exercitation pariatur dolor. Sit mollit commodo occaecat sint qui. Anim ut in sint irure eu velit in fugiat esse do. Elit fugiat id do adipisicing. Ipsum et ea voluptate incididunt magna consectetur nulla id fugiat. Amet do sit culpa veniam reprehenderit veniam labore aliqua Lorem laboris. Ut esse id proident cupidatat labore.',
      resolved: true,
      user: {
        name: 'Madge Delacruz',
      },
    },
    {
      _id: '632e6337a6db8ba5fee28a38',
      subject: 'Subject 2',
      body: 'Sint deserunt consequat nisi tempor sunt laboris cillum consectetur sunt cupidatat laboris ipsum dolore deserunt. Cillum adipisicing proident in minim ad deserunt qui aliquip id in elit. Officia sunt incididunt consectetur cillum non incididunt quis tempor eiusmod non. Esse ad adipisicing aliqua officia quis culpa proident et ut. Nisi ullamco labore et consequat in qui voluptate proident excepteur ipsum eiusmod labore occaecat aute. Velit ipsum duis fugiat laborum. Aliqua proident excepteur id do ipsum aliqua incididunt quis consequat consequat excepteur mollit velit deserunt. Ea aute commodo proident ex id id Lorem consectetur aliquip non proident.',
      resolved: false,
      user: {
        name: 'Koch Bowman',
      },
    },
    {
      _id: '632e6337a48dcc8015be0c87',
      subject: 'Subject 3',
      body: 'Magna tempor laboris velit est mollit laborum. Anim in ut ullamco excepteur cupidatat elit tempor culpa est labore veniam consequat excepteur. Dolore voluptate laboris dolor non aute ad. In ullamco veniam velit quis tempor deserunt nulla nostrud sint est nulla minim. Irure eu reprehenderit anim labore aute culpa tempor. Aute fugiat reprehenderit reprehenderit enim ut ea ea sunt ullamco qui incididunt ullamco velit. Qui ea dolore dolore aliqua adipisicing non laboris esse proident aliqua anim aliquip officia cillum. Consectetur magna ad excepteur anim pariatur minim nisi.',
      resolved: true,
      user: {
        name: 'Joann Watkins',
      },
    },
    {
      _id: '632e63376fb5c78f40e80911',
      subject: 'Subject 4',
      body: 'Amet do quis reprehenderit veniam incididunt nisi nostrud irure sit. Velit deserunt minim dolore aute dolore tempor ad excepteur. Quis mollit fugiat deserunt duis laborum nostrud eu ex nisi duis in reprehenderit velit. Nulla amet non nulla mollit duis est cillum ea qui commodo ullamco labore. Aliquip esse consequat ex duis laboris. Nulla anim et dolore veniam eu sit cupidatat in. Dolor do culpa ea dolor. Adipisicing incididunt quis elit anim reprehenderit consectetur do exercitation aliqua esse ut ad.',
      resolved: false,
      user: {
        name: 'Cash Macdonald',
      },
    },
    {
      _id: '632e6337705876a9daafa3b5',
      subject: 'Subject 5',
      body: 'Laborum nulla sit aliqua ea amet veniam. Esse laborum ullamco nostrud do adipisicing minim laboris. Incididunt ipsum adipisicing non ad. Sunt amet velit ad consequat quis aute anim anim ad deserunt quis voluptate. Magna laborum laboris ut dolor ea eu sit fugiat aute in dolor dolor culpa sint. Velit in tempor pariatur aute exercitation in. Consectetur dolore officia ad aliqua. Minim sint Lorem sunt commodo elit occaecat exercitation esse ea.',
      resolved: true,
      user: {
        name: 'Hester Nolan',
      },
    },
    {
      _id: '632e6337a48dcc8015be0c87',
      subject: 'Subject 6',
      body: 'Lorem cillum incididunt fugiat laboris nostrud anim nostrud. Laborum occaecat qui duis dolore ea elit in elit excepteur cillum proident nostrud elit id. In commodo ad officia et nostrud duis velit exercitation duis aute ex. Aliquip sit veniam excepteur eu anim eiusmod eu deserunt sit consequat occaecat. Ex aliqua aliqua amet incididunt ullamco ex enim cillum proident quis incididunt culpa eu. Sunt commodo voluptate dolor amet ea magna ea ut pariatur tempor. Eu fugiat commodo est non cillum. Aliquip occaecat adipisicing anim officia laboris est sit commodo.',
      resolved: true,
      user: {
        name: 'Kathrine Hays',
      },
    },
    {
      _id: '632e63376fb5c78f40e80911',
      subject: 'Subject 7',
      body: 'Enim labore culpa veniam culpa et. Ut mollit qui aliqua aliqua est ex do deserunt incididunt ea pariatur eu deserunt. Eu eu ut reprehenderit occaecat laborum nisi consequat officia occaecat officia do aute qui. Quis in nostrud laboris fugiat nostrud amet eu. Do aliquip magna sint minim anim enim enim. Aliquip aute ea proident laborum id adipisicing commodo nisi sit ipsum ad. Nisi commodo mollit voluptate ea nisi dolore. Ipsum anim est proident nulla irure nisi esse est eiusmod officia amet officia in proident.',
      resolved: false,
      user: {
        name: 'Curtis Bernard',
      },
    },
    {
      _id: '632e6337ff2beff05f9151af',
      subject: 'Subject 8',
      body: 'Excepteur consectetur minim voluptate nisi nisi. Excepteur enim aute ea aute et eu qui ut magna ut ea proident consectetur. Sint pariatur labore laborum sint amet consectetur. Ut est cillum ullamco ullamco ullamco officia aliquip anim. Cupidatat aliqua magna consequat excepteur laboris. Reprehenderit sit cupidatat aute ex cupidatat magna commodo amet aliquip ut mollit sit irure in. Est adipisicing culpa reprehenderit ea aliquip ipsum cillum. Id commodo do quis irure nisi ipsum do irure ea consectetur.',
      resolved: true,
      user: {
        name: 'Alejandra Snider',
      },
    },
    {
      _id: '632e6337dbcc10757750f75a',
      subject: 'Subject 9',
      body: 'Sint eu ut sint dolore culpa. Incididunt exercitation adipisicing nisi incididunt consequat consectetur aliquip aliqua anim sint ad dolor proident minim. Elit officia ipsum exercitation culpa adipisicing aliqua aliqua eu est consequat eiusmod pariatur aute. Excepteur proident esse occaecat anim. Pariatur Lorem labore sunt et velit Lorem exercitation nisi occaecat enim irure. Dolor labore officia non nulla non ex et adipisicing labore amet sint mollit dolor amet. Tempor do et magna id exercitation minim sint aliquip aliquip enim do eu proident. Tempor magna Lorem deserunt ut consectetur tempor nisi.',
      resolved: true,
      user: {
        name: 'Mathis Mcclure',
      },
    },
    {
      _id: '632e6337b05a9b20bd6a7445',
      subject: 'Subject 10',
      body: 'Aute est mollit labore nostrud laboris laborum cupidatat magna elit ad cupidatat. Exercitation commodo eiusmod tempor labore nostrud magna. Aliqua ullamco anim qui qui nostrud cupidatat voluptate. Id minim reprehenderit incididunt cupidatat proident consectetur enim ex anim. Occaecat amet adipisicing incididunt aliquip aliqua et officia in. Culpa esse anim officia ea ullamco quis magna cillum ullamco in minim fugiat do. Amet dolore sit nisi consectetur aute in ea ea ad tempor occaecat ex nostrud. Occaecat laboris et irure id cupidatat consequat ex pariatur.',
      resolved: true,
      user: {
        name: 'Burt Riddle',
      },
    },
    {
      _id: '632e63370f1d4de18fbf83a4',
      subject: 'Subject 11',
      body: 'Ullamco Lorem ad laborum nulla ut est et. Veniam tempor aute elit consequat esse id nostrud tempor. Ullamco nisi aute adipisicing consectetur aliquip esse quis dolore eu amet duis duis consequat duis. Sint laborum laborum aliqua tempor pariatur occaecat irure. Aliqua excepteur quis est nisi non anim do cupidatat id aute eu incididunt. Duis amet est et ipsum ad. Ex officia aliquip Lorem proident eu adipisicing deserunt mollit. Nulla aute incididunt eiusmod ea ad velit nisi commodo.',
      resolved: false,
      user: {
        name: 'Hart Chavez',
      },
    },
    {
      _id: '632e633728262fefb5239f68',
      subject: 'Subject 12',
      body: 'Ipsum aliquip amet nostrud exercitation sit Lorem exercitation cillum tempor pariatur nisi ex ipsum do. Sunt duis sunt non elit. Quis pariatur culpa enim laborum. Aliquip duis sunt proident aute cupidatat. Consequat excepteur officia duis voluptate quis dolor officia qui in adipisicing. Ut ea aliquip dolore eiusmod in veniam esse ex fugiat qui. Exercitation non minim velit incididunt fugiat reprehenderit quis dolor. Lorem excepteur nisi nostrud laboris.',
      resolved: true,
      user: {
        name: 'Good Wilkerson',
      },
    },
    {
      _id: '632e63373551d74771ca4666',
      subject: 'Subject 13',
      body: 'Deserunt qui eu ipsum do anim. Laboris commodo ad aliquip dolor voluptate culpa exercitation minim laborum magna laboris velit sit laborum. Eu ut amet id sunt officia velit irure magna id. In et eiusmod nostrud veniam do. Sint et officia exercitation sunt culpa eu esse dolore non voluptate sint voluptate magna in. Occaecat laboris reprehenderit aliquip aliqua. Veniam Lorem irure amet proident dolore. Eu qui ullamco ea ad in do nostrud laboris.',
      resolved: false,
      user: {
        name: 'Amy Mejia',
      },
    },
    {
      _id: '632e6337b39ded0157b8adf3',
      subject: 'Subject 14',
      body: 'Laborum cupidatat ad dolor ex esse. Sunt sit fugiat consequat laborum. Ut amet voluptate exercitation eu enim et irure. Mollit fugiat mollit sit sit do laboris. Incididunt in ipsum magna dolor duis mollit aliqua sunt cillum voluptate laboris dolore ullamco. Non exercitation fugiat ipsum laborum adipisicing id reprehenderit adipisicing est sint ex amet. Ut dolore veniam velit id laborum fugiat in non non eu tempor elit ad. Do exercitation occaecat veniam ullamco irure excepteur labore reprehenderit non consectetur do consequat id nostrud.',
      resolved: false,
      user: {
        name: 'Susanne Knox',
      },
    },
    {
      _id: '632e6337cd1e8317a91a7a81',
      subject: 'Subject 15',
      body: 'Ullamco commodo irure minim do reprehenderit commodo fugiat. Commodo exercitation deserunt tempor irure qui ad qui aute anim. Commodo ut mollit esse dolor ullamco reprehenderit proident do irure minim. Adipisicing incididunt nisi nostrud voluptate qui. Cillum exercitation consectetur velit labore exercitation nulla dolore labore pariatur est sint adipisicing ea laborum. Nostrud est excepteur consequat id minim cupidatat irure proident commodo. Dolor excepteur laborum nulla fugiat labore. Ea minim sunt ad cupidatat adipisicing aliqua et.',
      resolved: true,
      user: {
        name: 'Stanley Gardner',
      },
    },
  ];

  return {
    props: { reports, user: null },
  };
}
