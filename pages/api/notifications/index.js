export default function handler(req, res) {
  const notifications = [
    {
      username: 'jane',
      avatar: '/avatars/queen.jpg',
      message: 'liked your post',
      time: '2 mins ago',
      link: '/studio/dashboard'
    },
    {
      username: 'coachonair',
      avatar: '/avatars/p2.jpg',
      message: 'mentioned you in a comment',
      time: '5 mins ago',
      link: '/feed'
    },
    {
      username: 'kingcode',
      avatar: '/avatars/king.jpg',
      message: 'followed you',
      time: '10 mins ago',
      link: '/profile/kingcode'
    },
    {
      username: 'blogqueen',
      avatar: '/avatars/queen.jpg',
      message: 'commented on your post',
      time: '20 mins ago',
      link: '/feed'
    }
  ];

  res.status(200).json({ success: true, notifications });
}